import React from 'react';
import {connect} from 'react-redux';

import {subscribeEmail} from '../reducers/subscribe';

class SubscriptionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.subscribeEmail = props.subscribeEmail.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const subscribeForm = {
      email: data.get('input-email')
    };

    this.subscribeEmail(subscribeForm.email);
  }

  render() {
    return (
      <div className="subscribe-container text-center">
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <input className='input-subscribe--email' type="text" name="input-email" placeholder="Enter your email address" />
          <input className='input-subscribe--submit' type='submit' defaultValue='Subscribe' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSubscriber: state.subscribe.subscribed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeEmail: (email) =>
      dispatch(subscribeEmail(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionContainer);
