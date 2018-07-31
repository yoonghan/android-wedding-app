'use strict'

import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import { Toolbar as MaterialToolbar } from 'react-native-material-design';

class Toolbar extends Component {
  static contextTypes = {
      navigator: PropTypes.object
  };

  static propTypes = {
      onIconPress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigator } = this.context;
    const { onIconPress } = this.props;
    const { translate } = this.props.state;
    return (
      <MaterialToolbar
          title={navigator && navigator.currentRoute ? translate[navigator.currentRoute.title] : translate['Welcome']}
          icon={navigator && navigator.isChild ? 'keyboard-backspace' : 'menu'}
          onIconPress={() => navigator && navigator.isChild ? navigator.back() : onIconPress()}
          primary = {'paperPink'}
      />
    );
  }
}

export default connect(state => ({
  state: state.translate
  })
)(Toolbar);
