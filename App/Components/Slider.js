import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const { width: windowWidth } = Dimensions.get('window')

const Slider = ({ data, invertImage = false }) => {
  return (
    <View
      style={{
        height: 300,
        justifyContent: 'space-between',
        marginLeft: invertImage ? 10 : 0,
        marginRight: invertImage ? 0 : 10,
        alignItems: invertImage ? 'flex-start' : 'flex-end',
      }}
    >
      <Text style={{ fontSize: 16 }}>{`Цена ${data.price} руб.`}</Text>
      <Image
        source={data.image}
        style={{
          ...styles.image,
          tintColor: data.color,
        }}
      ></Image>

      <Text style={{ fontSize: 14 }}>{data.title}</Text>
    </View>
  )
}

Slider.propTypes = {
  data: PropTypes.object.isRequired,
  invertImage: PropTypes.bool,
}

const styles = StyleSheet.create({
  image: {
    height: 250,
    width: windowWidth * 0.3,
  },
})

export default Slider
