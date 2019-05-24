import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Router from 'next/router';
import { MockedProvider } from 'react-apollo/test-utils';
import Pagination, { PAGINATION_QUERY } from '../components/Pagination';

Router.router = { 
    push(){},
    prefetch(){},
};

function makeMoksFor(length) {
    return [{
        request: { query: PAGINATION_QUERY },
        result: { data: {
            itemsConnection: {
                __typename: 'aggregate',
                aggregate: {
                    __typename: 'count',
                    count: length,
                }
            }
        }},
    }]
};

describe('<Pagination />', () => {
    it('displays a loading message', () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMoksFor(1)}>
                <Pagination page={1} />
            </MockedProvider>
        );
       
        expect(wrapper.text()).toContain('Loading...');
    });
    it('renders pagination for 18 items', async() => {
        const wrapper = mount(
            <MockedProvider mocks={makeMoksFor(18)}>
                <Pagination page={1} />
            </MockedProvider>
        );
        await wait();
        wrapper.update();
    
        expect(wrapper.find('.totalPages').text()).toEqual('5');
        expect(toJSON(wrapper.find('PaginationStyles'))).toMatchSnapshot();
    });
    it('disables prev button on first page', async() => {
        const wrapper = mount(
            <MockedProvider mocks={makeMoksFor(18)}>
                <Pagination page={1} />
            </MockedProvider>
        );
        await wait();
        wrapper.update();

        expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(true);
        expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
    });
});