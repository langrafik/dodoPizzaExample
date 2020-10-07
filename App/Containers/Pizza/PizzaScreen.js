import React from 'react'
import { Text, View, Button, ActivityIndicator, StyleSheet, Alert } from 'react-native'
import Style from './PizzaScreenStyle'
import { ApplicationStyles, Helpers, Metrics } from 'App/Theme'
import Carousel from 'App/Components/Carousel'
import leftHalfPizza from '../../Assets/Images/left-half.png'
import rightHalfPizza from '../../Assets/Images/right-half.png'

const getRandomColor = () => {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const createPizzaList = (position = 'left') => {
  const isLeft = position === 'left'
  return Array.from({ length: 6 }).map((_, i) => {
    const ind = i + 1
    return {
      id: ind,
      color: getRandomColor(),
      title: `${isLeft ? 'Левая' : 'Правая'} половинка  №${ind}`,
      image: isLeft ? leftHalfPizza : rightHalfPizza,
      price: 100 * ind,
    }
  })
}

const leftList = createPizzaList();
const rightList = createPizzaList('right');

class PizzaScreen extends React.Component {
  state = {
    leftPrice: 0,
    rightPrice: 0
  }

  onIndexChange = (position) => (index, item) => {
    this.setState({
      [position + 'Price']: item.price
    })
  }

  handleSubmit = () => {
    const {
      total
    } = this.state;
    Alert.alert(
      "Выбрано!",
      "Проверьте корзину",
    );
  }

  render() {
    const { leftPrice, rightPrice, loading } = this.state;
    const total = leftPrice + rightPrice;
    return (
      <View
        style={[
          Helpers.fillCenter,
          Helpers.rowMain,
          Metrics.mediumHorizontalMargin,
          Metrics.mediumVerticalMargin,
        ]}
      >
        <View>
          <Text style={Style.text}>Пицца из двух половинок</Text>
          <View style={styles.container}>
            <View style={styles.item}>
              <Carousel data={leftList} onIndexChange={this.onIndexChange('left')} />
            </View>
            <View style={styles.item}>
              <Carousel data={rightList} invertImage onIndexChange={this.onIndexChange('right')} />
            </View>
          </View>
          <View style={styles.loaderContainer}>
            <Text style={styles.loaderText}>Общая цена: </Text>
            {loading ? <ActivityIndicator style={styles.indicator} size="small" color="#0000ff" /> : <Text style={styles.loaderText}>{total} руб.</Text>}
          </View>
          <Button disabled={loading} style={ApplicationStyles.button} title="Выбрать" onPress={this.handleSubmit} />
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
    flexWrap: 'wrap',
    maxHeight: 300,
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  item: {
    width: '50%', // is 50% of container width
  },
  loaderContainer: {
    flex: 1,
    maxHeight: 30,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  indicator: {
    width: 50
  }
})

export default PizzaScreen
