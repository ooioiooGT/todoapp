import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import React, {useState} from 'react';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

export default function Home (){
  
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]); 
  const addTodo = async () => {
    const newTodo = {
        value: text
    };

    try {
        const docRef = await addDoc(collection(FIRESTORE_DB, "todos"), {value:text });

        const addedTodo = { value: text, id: docRef.id };
        setTodos([...todos, addedTodo]);
    }
    catch(e){
        console.error("Error adding document: ", e);}
  };

  return (
    <View>
      <Text>Todo List</Text>
      <TextInput 
      style={styles.container}
      value={text} 
      placeholder='Type todo list here...' 
      onChangeText={setText}/>
      <Button 
      title='ADD TODO'
      onPress={addTodo}/>

      <FlatList 
      data={todos}
      renderItem={({ item }) => (
        <Text>{item.value}</Text>
      )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 3,
        borderColor: 'black'
    },
});
