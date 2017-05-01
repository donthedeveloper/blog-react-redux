import React from 'react';
import {connect} from 'react-redux';

import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import SubscribeForm from '../components/SubscribeForm';

import {subscribeEmail} from '../reducers/subscribe';

class SubscriptionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const subscribeForm = {
      email: data.get('input-email')
    };

    this.props.subscribeEmail(subscribeForm.email);
  }

  render() {
    return (
      <div className="subscribe-container text-center">
        { this.props.errorMessage &&
          <ErrorMessage errorMessage={this.props.errorMessage} />
        }

        {(this.props.isSubscriber) ?
          (<SuccessMessage successMessage={this.props.successMessage} />) :
          (<SubscribeForm onFormSubmit={this.onFormSubmit} />)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSubscriber: state.subscribe.isSubscriber,
    successMessage: state.subscribe.successMessage,
    errorMessage: state.subscribe.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeEmail: (email) =>
      dispatch(subscribeEmail(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionContainer);
