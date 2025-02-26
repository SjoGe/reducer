import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: Date.now().toString(), text: action.payload }];
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  const addTask = () => {
    if (text.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: text });
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <Text style={styles.bio}>Delete task by clicking it</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={text}
          onChangeText={setText}
        />
        <Button title="Save" onPress={addTask} />
      </View>
      <FlatList
        data={state}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_TASK', payload: item.id })}>
            <Text style={styles.task}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 70,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  task: {
    padding: 15,
    backgroundColor: '#808080',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 18,
  },
});

export default TodoApp;
