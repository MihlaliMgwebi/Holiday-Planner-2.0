import { createFeature, createReducer } from '@ngrx/store';

export const userFeatureKey = 'user';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

