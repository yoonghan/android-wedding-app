'use strict';

import React, {Component, PropTypes} from 'react';

import {
  ListView,
  StyleSheet,
  Text,
  View
}
from 'react-native';

import { connect } from 'react-redux';
import { Icon } from 'react-native-material-design';

class TableArrangementView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2
          });
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(this.convertArrangementArrayToMap()),
      containerStyle: this.createDynamicStyle()
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderSectionHeader}
          renderSeparator={this._renderSeparator}
        />
      </View>
    );
  };

  _renderRow = (rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) => {
    const containerStyle = this.state.containerStyle;
    const evenRow = ((rowID % 2) == 0);
    const noOfPax = rowData.pax;
    return (
        <View>
          <View style={[styles.section_container, evenRow && styles.alt_color]}>
            <Text style={containerStyle.nameSize}>
              {(noOfPax > 1) ? (rowData.name + ' (' + noOfPax + ' pax) ') : (rowData.name + ' ') }
              <Icon name="face" size={14}/>
            </Text>
          </View>
        </View>
    );
  };

  _renderSectionHeader = (sectionData, category) => {
    const {translate} = this.props.state;
    return (
      <View>
        <Text style={styles.sec_header}>
          <Icon name="room" size={20} color="#FFFFFF"/>
          {category === '0' ? translate['tblarrangement.main'] : (translate['tblarrangement.table'] + ' ' + category)}
        </Text>
      </View>
    )
  }

  _renderSeparator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  };

  convertArrangementArrayToMap = () => {
    var arrangementCategoryMap = {}; // Create the blank map
    table_list.forEach(function(tableList) {
      if (!arrangementCategoryMap[tableList.num]) {
        arrangementCategoryMap[tableList.num] = [];
      }
      arrangementCategoryMap[tableList.num].push(tableList.info);
    });
    return arrangementCategoryMap;
  };

  createDynamicStyle = () => {
    const {fontSize} = this.props.textState;
    return StyleSheet.create({
      nameSize: {
        fontSize: fontSize,
        textAlign: 'right'
      }
    });
  }
};

var table_list = [
  {num: '3', info: {name: 'Teng Tien Ming', pax: 2}},
  {num: '3', info: {name: 'Aunty Alice', pax: 2}},
  {num: '3', info: {name: 'Ban Poon Huat & Family', pax: 6}},
  {num: '4', info: {name: 'Irene Tan', pax: 1}},
  {num: '4', info: {name: 'Ong Tee Hui', pax: 2}},
  {num: '4', info: {name: 'Gabriel Ho', pax: 2}},
  {num: '4', info: {name: 'Jenny Ng', pax: 2}},
  {num: '4', info: {name: 'Tan Kin Seng', pax: 2}},
  {num: '5', info: {name: 'Chang Mei Tzue', pax: 1}},
  {num: '5', info: {name: 'Dorothy Wong', pax: 1}},
  {num: '5', info: {name: 'Kok Sue Mae', pax: 1}},
  {num: '5', info: {name: 'Loi Siew Yong', pax: 1}},
  {num: '5', info: {name: 'Nancy Khoo', pax: 1}},
  {num: '5', info: {name: 'Tony Teh', pax: 2}},
  {num: '5', info: {name: 'William Lee', pax: 2}},
  {num: '5', info: {name: 'Lillian Gan', pax: 1}},
  {num: '0', info: {name: 'Loh Ah Swee', pax: 1}},
  {num: '6', info: {name: 'Loo Shoi Onn', pax: 1}},
  {num: '6', info: {name: 'Looi Too Hoong', pax: 2}},
  {num: '6', info: {name: 'Micheal Liew', pax: 1}},
  {num: '6', info: {name: 'Tan Bak Hwa', pax: 2}},
  {num: '6', info: {name: 'Mak Kam Meng & Family', pax: 3}},
  {num: '2', info: {name: 'Moey Kim Chong', pax: 2}},
  {num: '2', info: {name: 'Tan Ah Hock', pax: 5}},
  {num: '2', info: {name: 'Tham Lai Siong', pax: 3}},
  {num: '1', info: {name: 'Vicent Yoong', pax: 3}},
  {num: '1', info: {name: 'Yong Wai Hoong (Raymond)', pax: 2}},
  {num: '1', info: {name: 'Yong Wai Keong', pax: 2}},
  {num: '1', info: {name: 'Yong Yoke Pei', pax: 2}},
  {num: '1', info: {name: 'Yong Yoke Mae', pax: 1}},
  {num: '7', info: {name: 'Lee Wan\'s Relatives', pax: 10}},
  {num: '8', info: {name: 'Lee Wan\'s Relatives', pax: 10}},
  {num: '9', info: {name: 'Good Relatives & Friends', pax: 10}}
];

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems:'stretch'
  },
  section_container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    padding: 10
  },
  alt_color: {
    backgroundColor: '#BBDEFB',
  },
  sec_header: {
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
    fontSize: 18,
    padding: 10,
    fontWeight: '700'
  }
});

export default connect(state => ({
  state: state.translate,
  textState: state.textSize
  })
)(TableArrangementView);
