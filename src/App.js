import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity , ScrollView , RefreshControl } from 'react-native';
import { TaskManager } from './taskmanager.js';
import Task from './task.js';
import Controller from './Controller.js';

export default function App() {

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(200).then(() => setRefreshing(false));
  }, []);
  
  const buttonRefresh = () => {
    setRefreshing(true);
    wait(200).then(() => setRefreshing(false));
  }
  const clearTasks = () => {
    TaskManager.removeAllTasks();
    setRefreshing(true);
    wait(200).then(() => setRefreshing(false));
  }

  const task = new Task("Task", 60);
  const task2 = new Task("Task2", 60);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true}/>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >

        <View style={styles.tasksWrapper}>
          <TouchableOpacity style={styles.input} onPress={() => TaskManager.addTask(task)}><Text>Add Task A</Text></TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => TaskManager.addTask(task2)}><Text>Add Task B</Text></TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => clearTasks()}><Text>Clear Tasks</Text></TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => buttonRefresh()}><Text>Show Tasks</Text></TouchableOpacity>
          
          <View style={styles.items}>
            <Text>{JSON.stringify(TaskManager.getAllTasks())}</Text>
          </View>
          
        </View>
      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});