import { StyleSheet, Text, TextComponent, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Task = (props) => {
  return (
    <View>
        <View>
        <Text>{props.text}</Text>
        </View>
        <View> 
        <TouchableOpacity>
            
        </TouchableOpacity>
        </View>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({})