import React from 'react';
import {connect} from 'react-redux';

class SubscriptionContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  onFormSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="subscribe-container text-center">
        <form onSubmit={this.onFormSubmit}>
          <input className='input-subscribe--email' type="email" name="input-email" placeholder="Enter your email address" />
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
    subscribe:
  }
}

export default connect(mapStateToProps)(mapDispatchToProps)SubscriptionContainer;
