import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import formComponent from '@/components/formComponent.vue'

describe('formComponent.vue', () => {
  it('has data', () => {
    expect(typeof formComponent.data).toBe('function')
  })
})

describe('Mounted App', () => {
  const wrapper = mount(formComponent);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('Testing Component props', () => {
  const wrapper = shallowMount(formComponent, {
      propsData: {
        disabledDates: [{},{}],
        chosenDates: {start: null, end: null},
        minDate: new Date(2021, 0, 21),
        price: '1234',
        rating: 2.5,
        maxRating: 7,
        field: 'test'
  }
  });
  it('checks the component name', () => {
  expect(wrapper.name()).toMatch('FormComponent')
  })
  it('checks the prop disabledDates', () => {
      expect(wrapper.props().disabledDates).toStrictEqual([{},{}]);
  })
  it('checks the prop minDate', () => {
    expect(wrapper.props().minDate).toStrictEqual(new Date(2021, 0, 21));
  })
  it('checks the prop price', () => {
    expect(wrapper.props().price).toBe('1234');
  })
  it('checks the prop rating', () => {
    expect(wrapper.props().rating).toBe(2.5);
  })
  it('checks the prop maxRating', () => {
    expect(wrapper.props().maxRating).toBe(7);
  })
  it('checks the prop field', () => {
    expect(wrapper.props().field).toBe('test');
  })
})