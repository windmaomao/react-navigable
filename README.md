# React Navigable

Common behavior component for listing items and navigating in between.

> Notes: the component isn't useful enough if you are going to implement similar interface directly in your own component, however it'll become more resuable and robust in case that this interface needs to channel through multiple children components carrying these navigation properites and functions.

## Usage

```
  <Navigable 
    items={items}
    activeItem={activeItem}
    onSelectItem={onSelectItem}
    circular={false}
    backward={false}
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

The render prop passes `items` and `activeItem` through to the child component, along with other utility functions, such as

- goto(item), jump to one item
- prev(), go to the previous item
- next(), go to the next item

Depending if `circular` or `backward` flag is set, the list can behave going circular or backward.  

## Examples

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

This component can be further used for `Carousel` and `Table` referred as `PaginatorComponent`.

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

### Nav

Although the `items` is normally as simple as a number array `[1,2,...]`, in practice, it can be extended as array of object, ex. `[{ label: 'Home' }]`, which can be then passed into nav item rendering.

```
  {({ items, activeItem, goto }) => (
    <Container>
      <Row>
        {items.map((item, i) => (
          <Col key={i}>
            <NavItem
              item={item}
              active={activeItem === item}
              onSelect={goto}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )}
```

## State management

The navigation state isn't self contained, instead is controlled via the prop `activeItem` and the callback `onSelectItem`, similar to an input `value` and `onChange`.

The state management isn't included, but can be implemented quickly via your own version, such as `hooks`.

```
  const [activeItem, setActiveItem] = useState(items[0])

  <Navigable 
    items={items} 
    activeItem={activeItem}
    onSelectItem={setActiveItem}
  >
    ...
  </Navigable>
```

Once a state management is applied, the above code (or component) becomes self contained.