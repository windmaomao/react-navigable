'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

var list = function list(c, i, circular) {
  var firstIndex = function firstIndex() {
    return c ? 0 : null;
  };

  var lastIndex = function lastIndex() {
    return c ? c - 1 : null;
  };

  var prevIndex = function prevIndex() {
    return i > 0 ? i - 1 : !circular ? null : lastIndex();
  };

  var canPrev = function canPrev() {
    return prevIndex() !== null;
  };

  var nextIndex = function nextIndex() {
    return i < c - 1 ? i + 1 : !circular ? null : firstIndex();
  };

  var canNext = function canNext() {
    return nextIndex() !== null;
  };

  return {
    firstIndex: firstIndex,
    lastIndex: lastIndex,
    prevIndex: prevIndex,
    canPrev: canPrev,
    nextIndex: nextIndex,
    canNext: canNext
  };
};

/**
 * Navigable is a render prop component
 * which output its children with 
 * a component that provides 
 * new set of props as inputs
 */

var Navigable = function Navigable(_ref) {
  var items = _ref.items,
      activeItem = _ref.activeItem,
      onSelectItem = _ref.onSelectItem,
      children = _ref.children,
      circular = _ref.circular;
  if (!items) return null;
  if (!children) return null;
  var fns;
  var prevIndex, canPrev, nextIndex, canNext;
  React.useEffect(function () {
    var count = items.length;
    var index = items.indexOf(activeItem);
    fns = list(count, index, circular);
    prevIndex = fns.prevIndex();
    canPrev = fns.canPrev();
    nextIndex = fns.nextIndex();
    canNext = fns.canNext();
  }, [items, activeItem, circular]);

  var _goto = React.useCallback(onSelectItem);

  var prev = React.useCallback(function () {
    return canPrev && _goto(items[prevIndex]);
  });
  var next = React.useCallback(function () {
    return canNext && _goto(items[nextIndex]);
  });
  var newProps = {
    items: items,
    activeItem: activeItem,
    "goto": _goto,
    prevIndex: prevIndex,
    canPrev: canPrev,
    prev: prev,
    nextIndex: nextIndex,
    canNext: canNext,
    next: next
  };
  return children(newProps);
};

Navigable.propTypes = {
  items: PropTypes.array,
  activeItem: PropTypes.any,
  onSelectItem: PropTypes.func,
  children: PropTypes.func,
  circular: PropTypes.bool
};
Navigable.defaultProps = {
  items: null,
  activeItem: null,
  onSelectItem: function onSelectItem() {},
  children: null,
  circular: false
};

exports.default = Navigable;
exports.list = list;
