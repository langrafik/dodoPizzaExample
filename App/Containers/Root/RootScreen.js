import React, { useEffect } from 'react'
import NavigationService from 'App/Services/NavigationService'
import AppNavigator from 'App/Navigators/AppNavigator'
import { View } from 'react-native'
import StartupActions from 'App/Stores/Startup/Actions'
import { Helpers } from 'App/Theme'
import { useDispatch } from 'react-redux'
import PizzaScreen from '../Pizza/PizzaScreen'

const RootScreen = () => {
  // Deep linking prefix
  const prefix = 'boilerplate://';
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(StartupActions.startup())
  }, [])

  return (
    <View style={Helpers.fill}>
      <PizzaScreen />
    </View>
  )
}

export default RootScreen
