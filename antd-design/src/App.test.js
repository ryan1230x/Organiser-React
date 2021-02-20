import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import TagDrawer from './components/Home/TagDrawer';
import store from "./store";

test('renders learn react link', () => {
  render(<Provider store={store}>
    <TagDrawer />
    </Provider>)
});
