import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'

class Form extends React.Component {
  static defaultProps = {
    name: 'Liên hệ',
    subject: '', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action } = this.props

    return (
      <Fragment>
        <form
          className="Form"
          name={name}
          action={action}
          onSubmit={this.handleSubmit}
          data-netlify=""
        >
          {this.state.alert && (
            <div className="Form--Alert">{this.state.alert}</div>
          )}
          <div className="Form--Group">
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Họ"
                name="firstname"
                required
              />
              <span>Họ</span>
            </label>
            <label className="Form--Label">
              <input
                className="Form--Input Form--InputText"
                type="text"
                placeholder="Tên"
                name="lastname"
                required
              />
              <span>Tên</span>
            </label>
          </div>
          <label className="Form--Label">
            <input
              className="Form--Input Form--InputText"
              type="email"
              placeholder="Email"
              name="emailAddress"
              required
            />
            <span>Địa chỉ Email</span>
          </label>
          <label className="Form--Label has-arrow">
            <select
              className="Form--Input Form--Select"
              name="type"
              defaultValue="Nội dung liên hệ"
              required
            >
              <option disabled hidden>
                Nội dung liên hệ
              </option>
              <option>Tìm hiểu công ty</option>
              <option>Đặt vận chuyển</option>
              <option>Liên hệ khác</option>
            </select>
          </label>
          <label className="Form--Label">
            <textarea
              className="Form--Input Form--Textarea Form--InputText"
              placeholder="Thông điệp"
              name="message"
              rows="10"
              required
            />
            <span>Nội dung</span>
          </label>
          <label className="Form--Label Form-Checkbox">
            <input
              className="Form--Input Form--Textarea Form--CheckboxInput"
              name="newsletter"
              type="checkbox"
            />
            <span>Nhận thông tin cập nhật</span>
          </label>
          {!!subject && <input type="hidden" name="subject" value={subject} />}
          <input type="hidden" name="form-name" value={name} />
          <input
            className="Button Form--SubmitButton"
            type="submit"
            value="Liên hệ"
            disabled={this.state.disabled}
          />
        </form>
      </Fragment>
    )
  }
}

export default Form
