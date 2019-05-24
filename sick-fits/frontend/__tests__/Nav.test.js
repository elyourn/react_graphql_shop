import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const notSignedInMocks = [{
    request: { query: CURRENT_USER_QUERY },
    result: { data: {
        me: null,
    }},
}];

const signedInMocks = [{
    request: { query: CURRENT_USER_QUERY },
    result: { data: {
        me: fakeUser(),
    }},
}];

const signedInWithCartItemsMocks = [{
    request: { query: CURRENT_USER_QUERY },
    result: { data: {
        me: {
            ...fakeUser(), 
            cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()]
        },
    }},
}];

describe('<Nav />', () => {
    it('render a minimal nav when sign out', async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignedInMocks}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('NavStyles');
        expect(toJSON(nav)).toMatchSnapshot();
    });
    it('render a full nav when sign in', async () => {
        const wrapper = mount(
            <MockedProvider mocks={signedInMocks}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('NavStyles').children();
        expect(nav.children().length).toBe(6);
        expect(nav.text()).toContain('Sign out');
    });

    it('render the amount of items in the cart', async () => {
        const wrapper = mount(
            <MockedProvider mocks={signedInWithCartItemsMocks}>
                <Nav />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        const nav = wrapper.find('NavStyles');

        const count = nav.find('div.count');
        expect(toJSON(count)).toMatchSnapshot();
    });
});