import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View,} from 'react-native';
import {Colors} from '../res/styles/Colors';
import {ResponsivePixels} from '../res/styles/ResponsivePixels';
import {HeaderView} from './HeaderView';
import {FontName} from '../res/styles/FontName';

interface IProps {
  showModal: boolean;
  hideModel: any;
  children: any;
}

export default function CustomModal(props: IProps) {
  const {showModal, hideModel, children, } = props;
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <HeaderView backgroundColor={Colors.blackWithCustomOpacity(0.4)} />
        <TouchableWithoutFeedback onPress={hideModel}>
          <View style={styles.OuterView}>
            <TouchableWithoutFeedback>
              <View style={styles.InnerView}>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  OuterView: {
    backgroundColor: Colors.blackWithCustomOpacity(0.1),
    flex: 1,
    justifyContent: 'center',
  },

  InnerView: {
    backgroundColor: Colors.defaultWhite,
    borderRadius:ResponsivePixels.size20,
    marginHorizontal:ResponsivePixels.size20,
    alignItems: 'center',
  },
});
