import { shallow } from '@vue/test-utils'
import DialogApi from '@/components/dialog'
import Dialog from '@/components/dialog/dialog.vue'
import sinon from 'sinon'

describe('test dialog api', () => {
  afterEach(() => {
    DialogApi.close()
  })

  it('create a dialog', () => {
    const callbackSpy = sinon.spy()

    DialogApi({
      title: 'title',
      message: 'test message',
      skin: 'ios',
      showCancelBtn: true
    }, callbackSpy)

    setTimeout(() => {
      expect(document.querySelector('.weui-dialog')).toBeTruthy()
    }, 300)
  })

  it('open an alert dialog', () => {
    DialogApi.alert({}).then(action => {
      expect(action).toBe('confirm')
    })

    expect(document.querySelector('.weui-dialog')).toBeTruthy()
    document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
  })

  it('open a confirm dialog, and confirm it', () => {
    DialogApi.confirm({}).then(action => {
      expect(action).toBe('confirm')
    })

    expect(document.querySelector('.weui-dialog')).toBeTruthy()
    document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
  })

  it('open a confirm dialog, and cancle it', () => {
    DialogApi.confirm({}).catch(action => {
      expect(action).toBe('cancel')
    })

    expect(document.querySelector('.weui-dialog')).toBeTruthy()
    document.querySelector('.weui-dialog__ft>.weui-dialog__btn_default').click()
  })

  it('open a confirm dialog with callback', () => {
    DialogApi.confirm({
      callback: action => {
        expect(action).toBe('confirm')
      }
    })

    expect(document.querySelector('.weui-dialog')).toBeTruthy()
    document.querySelector('.weui-dialog__ft>.weui-dialog__btn_primary').click()
  })
})

describe('dialog component', () => {
  let wrapper
  afterEach(() => {
    wrapper && wrapper.destroy()
  })

  it('create', () => {
    wrapper = shallow(Dialog, {
      propsData: {}
    })

    expect(wrapper.name()).toBe('wv-dialog')
    expect(wrapper.contains('.weui-dialog')).toBeTruthy()
  })

  it('click cancel button', () => {
    const callbackSpy = sinon.spy()

    wrapper = shallow(Dialog, {
      propsData: {
        'visible.sync': true,
        callback: callbackSpy
      }
    })

    wrapper.findAll('.weui-dialog__btn').at(0).trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.emitted().cancel).toBeTruthy()
    expect(callbackSpy.called).toBeTruthy()
  })

  it('click confirm button', () => {
    const callbackSpy = sinon.spy()

    wrapper = shallow(Dialog, {
      propsData: {
        'visible.sync': true,
        callback: callbackSpy
      }
    })

    wrapper.findAll('.weui-dialog__btn').at(1).trigger('click')
    expect(wrapper.vm.visible).toBe(false)
    expect(wrapper.emitted().confirm).toBeTruthy()
    expect(callbackSpy.called).toBeTruthy()
  })
})
