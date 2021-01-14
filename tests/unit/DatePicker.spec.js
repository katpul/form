import { shallowMount } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'

describe('DatePicker.vue', () => {
  it('has data', () => {
    expect(typeof DatePicker.data).toBe('function')
  })
})

describe('Mounted App', () => {
  const wrapper = mount(DatePicker);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('Testing Component props', () => {
  const wrapper = shallowMount(DatePicker, {
      propsData: {
        currentDay: new Date(2010, 2, 10),
        minDate: new Date(2021, 0, 10),
        disabledDates: [{},{}],
  }
  });
  it('checks the component name', () => {
  expect(wrapper.name()).toMatch('DatePicker')
  })
  it('checks the prop currentDay', () => {
      expect(wrapper.props().currentDay).toStrictEqual(new Date(2010, 2, 10));
  })
  it('checks the prop minDate', () => {
    expect(wrapper.props().minDate).toStrictEqual(new Date(2021, 0, 10));
  })
  it('checks the prop disabledDates', () => {
    expect(wrapper.props().disabledDates).toStrictEqual([{},{}]);
  })
})