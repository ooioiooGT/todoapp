import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import { FIRESTORE_DB } from '../firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';

export default function Home (){
  
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]); 

  const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "todos"));
    const todosArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // This spreads the document's fields into the object
    }));
    setTodos(todosArray);
};

useEffect(() => {
    fetchTodos();
}, []); // Empty dependency array means this effect runs once on mount


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
    <View style={styles.header}>
      <Text style={styles.title}>Todo List</Text>
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.value}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50, // Adjust padding top to push content down from the status bar
    paddingBottom: 20, // Optional: Add some padding at the bottom of the header
    backgroundColor: '#fff', // Optional: Set a background color for the header
    width: '100%', // Ensure the header spans the entire width
    alignItems: 'center', // This centers the title horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    width: '80%',
    padding: 8,
    marginVertical: 8,
    backgroundColor: "#f9c2ff",
    borderRadius: 10,
  },
});