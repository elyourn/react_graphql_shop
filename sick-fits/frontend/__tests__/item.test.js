import { shallow } from 'enzyme';
import ItemComponent from '../components/Item';
import toJSON from 'enzyme-to-json';

const mockItem = {
    id: 'ABC123',
    title: 'A cool item',
    price: 5000,
    description: 'This item is really cool',
    image: 'dog.jpg',
    largeImage: 'largedog.jpg',
};

describe('<Item />', () => {
    it('renders and matches the snapshot', () => {
        const wrapper = shallow(<ItemComponent item={mockItem} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
    // it('renders the image properly', () => {
    //     const wrapper = shallow(<ItemComponent item={mockItem} />);
    //     const img = wrapper.find('img');
    //     expect(img.props().src).toBe(mockItem.image); 
    // });
    // it('renders and display properly', () => {
    //     const wrapper = shallow(<ItemComponent item={mockItem} />);
    //     const PriceTag = wrapper.find('PriceTag');
    //     expect(PriceTag.dive().text()).toBe('$50');
    // });
});