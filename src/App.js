import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity , ScrollView , RefreshControl, Button } from 'react-native';
import { TaskManager } from './taskmanager.js';
import Task from './task.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="Tasks" 
          component={TasksScreen}
          options={{title: "Welcome"}}
        />
        <Stack.Screen 
          name="Timer" 
          component={TimerScreen}
        />
        
      
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const TasksScreen = ({ navigation }) => {
  return(
    <Button 
            title="Start Session"
            onPress={ () => navigation.navigate("Timer") }
          />
  );
}

const TimerScreen = ({ navigation }) => {
  return(
    <View>
      <Text>This is the Timer Page</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const Home = ({ navigation }) => {

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const buttonRefresh = () => {
    setRefreshing(true);
    wait(0).then(() => setRefreshing(false));
  }
  const clearTasks = () => {
    TaskManager.removeAllTasks();
    buttonRefresh();
  }
  const addTask = (taskName) => {
    const task = new Task(taskName, 60);
    TaskManager.addTask(task);
    buttonRefresh();
    return task;
  }
  
  const prettyifyOutput = (output) => {
    prettyOutput = "";
    
    JSON.parse(output).forEach(task => {
      let name = task.name,
	    duration = task.duration,
      urgency = task.urgency,
      timeLeft = task.timeLeft,
      id = task.id;

      let taskOutput = `Task: "${name}" \nID: ${id} \nUrgency: ${urgency} \n${((duration - timeLeft) / duration) * 100}% complete\n\n`;
      prettyOutput += taskOutput;      	  
    });
	  return prettyOutput;
  }


  
  return (
    <NavigationContainer>
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
              <TouchableOpacity style={styles.input} onPress={() => addTask("Task 1")}><Text>Add Task A</Text></TouchableOpacity>
              <TouchableOpacity style={styles.input} onPress={() => addTask("Task 2")}><Text>Add Task B</Text></TouchableOpacity>
              <TouchableOpacity style={styles.input} onPress={() => clearTasks()}><Text>Clear Tasks</Text></TouchableOpacity>
                
              <View style={styles.items}>
                <Text>{JSON.stringify(TaskManager.getAllTasks())}</Text>
              </View>
                
            </View>
          </ScrollView>
          <Button 
            title="Start Session"
            onPress={ () => navigation.navigate("Timer") }
          />

<<<<<<< Updated upstream
        <View style={styles.tasksWrapper}>
          <TouchableOpacity style={styles.input} onPress={() => addTasks("Task 1")}><Text>Add Task A</Text></TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => addTasks("Task 2")}><Text>Add Task B</Text></TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => clearTasks()}><Text>Clear Tasks</Text></TouchableOpacity>
          
          <View style={styles.items}>
            <Text>{prettyifyOutput(JSON.stringify(TaskManager.getAllTasks()))}</Text>
          </View>
          
        </View>
      
      </ScrollView>
    </SafeAreaView>
=======
        </SafeAreaView>
    </NavigationContainer>
    
>>>>>>> Stashed changes
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

export default App;