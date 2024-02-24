import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../firebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

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

  // Function to sign out the user
  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      console.log('User signed out successfully');
      // Here you can navigate the user back to the login screen or perform other actions
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo List</Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={text}
        placeholder='Type todo list here...'
        onChangeText={setText} />

      <Button
        title='ADD TODO'
        onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.value}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    paddingBottom: 20,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 8,
    marginVertical: 8,
    backgroundColor: "#f9c2ff",
    borderRadius: 10,
  },
  signOutButton: {
    position: 'absolute',
    right: 10,
    top: 50, // Adjust according to your app's header height
    padding: 10,
    backgroundColor: 'red', // Optional: Style as needed
    borderRadius: 5,
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
