# React Navigable

Common behavior to display list of items and help navigate in between.

## Usage

```
  <Navigable 
    items={items}
    activeItem={activeItem}
    onSelectItem={onSelectItem}
    circular={false}
  >
    {(    
      items, activeItem,       
      goto, prev, next,
      prevIndex, canPrev,
      nextIndex, canNext,
    ) => {
      <div></div>
    }}
  </Navigable>
```

Once the array of items is provided via `items`, the component can be controlled by the prop `activeItem` and the callback `onSelectItem`.

The render prop passes `items` and `activeItem` through to the child component, along with other utility functions, such as

- goto(item), jump to one item
- prev(), go to the previous item
- next(), go to the next item

Depending if `circular` flag is set, the list will be one time or repeat itself with no stop.  

## Examples

The idea of using this component is to facilliate other components which share similar navigation behavior, such as paginator, table, carousel, or navbar etc. 


### Paginator

Assuming `items` is array of numbers `[1,2,3,4,5]`. The render prop can manage 

- click to each page 
- feel for active page
- click to the previous button
- disable previous button

```
  ({ items, activeItem, canPrev, prev, goto }) => (
    <button 
      onClick={e => { prev() }}
      disabled: !canPrev
    >Prev</button>
    <ul>
      {items.map(i => (
        <li 
          key={i}
          onClick={e => { goto(i) }}
          className={(activeItem === i) && 'active'}
        >{i}</li>
      ))}
    </ul>
  )
```

This design can be further used for `Carousel` and `Table` and it'll be referred as `PaginatorComponent`.

### Carousel

Assume the slide content can be rendered by `ItemComponent`, the render prop can be responsible for 

- display for each slide
- click to the next button
- disable next button
- pagination using the above example

```
  {({ items, activeItem, canNext, next, goto, ...all }) => (
    <div>
      <div className='carousel slide fade'>
        <div className="carousel-inner">
          {items.map((_, i) => (
            <ItemComponent 
              key={i}
              index={i} 
              slide={true}
              active={i === activeItem}
              className='carousel-item'
            />
          ))}
        </div>
        <button
          action="next"
          className: "carousel-control-next",
          onClick: e => { next() }
          disabled: !canNext
        />             
      </div>
      {<PaginatorComponent {...all} />}
    </div>
  )
```

### Table

Assume the main table area can be rendered by `TbodyPage`, the render prop can be responsible for 

- display for current visible table content
- pagination using the above example

```
  {({ activeItem, ...all }) => (
    <TableComponent>
      <TbodyPage 
        page={activeItem}
      />
      {<PaginatorComponent {...all} />}
    </TableComponent>
  )}
</Navigable>
```