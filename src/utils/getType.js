// @flow
import { List, Map as ImMap, Set as ImSet, OrderedMap, OrderedSet, Stack, Seq } from 'immutable';
import objType from 'react-json-tree/lib/objType';

type Type =
  string |
  'Immutable List' |
  'Immutable Map' |
  'Immutable Set' |
  'Immutable OrderedMap' |
  'Immutable OrderedSet' |
  'Immutable Stack' |
  'Immutable Seq';

export default function getType(value: any): Type {
  if (List.isList(value)) {
    return 'Immutable List';
  } else if (ImMap.isMap(value)) {
    return 'Immutable Map';
  } else if (ImSet.isSet(value)) {
    return 'Immutable Set';
  } else if (OrderedMap.isOrderedMap(value)) {
    return 'Immutable OrderedMap';
  } else if (OrderedSet.isOrderedSet(value)) {
    return 'Immutable OrderedSet';
  } else if (Stack.isStack(value)) {
    return 'Immutable Stack';
  } else if (Seq.isSeq(value)) {
    return 'Immutable Seq';
  }

  return objType(value);
}
