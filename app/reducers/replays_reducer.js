import _ from 'lodash';

import {
  NEW_REPLAY, NEW_REPLAYS, FETCH_REPLAYS, UPDATE_REPLAY_UPLOAD_STATUS
} from '../actions/replay_actions';


export default function(state = [], action) {
  switch (action.type) {
    case NEW_REPLAY:
      return [...state, action.payload];
    case NEW_REPLAYS:
      return _.flatten([...state, action.payload]);
    case FETCH_REPLAYS:
      return action.payload;
    case UPDATE_REPLAY_UPLOAD_STATUS:
      _.remove(state, (replay) => {
        return replay.filename === action.payload.filename;
      });
      return [...state, action.payload];
    default:
      return state;

  }

}
