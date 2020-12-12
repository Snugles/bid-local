import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import { Icon } from 'native-base';
import { DELETE_ITEM } from '../queries/usersListedItems';
import { useMutation } from '@apollo/client';

export default function ExpandableComponent (props) {

  const [deleteItemById, {data}] = useMutation(DELETE_ITEM);

  useEffect(()=>{
    if (data) {
      if (data.delete_item_by_id) {
        props.deleteItem(id)
      }
    }
  }, [data])

  function handleDelete() {
    const deleteVariables = {
      itemId: props.id
    };
    deleteItemById({ variables: deleteVariables });
  }

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onClickFunction}
        style={styles.header}
      >
        <Text style={styles.headerText}>EDIT</Text>
      </TouchableOpacity>
      <View
        style={{
          height: props.layoutHeight,
          overflow: 'hidden',
        }}
      >
        <View>
          <Text style={{marginTop: 10}}>Title</Text>
          <TextInput
            style={styles.textBoxes}
            value={props.title}
            onChangeText={(text) => {
              props.setTitle(text);
            }}
          ></TextInput>
          <Text style={{marginTop: 10}}>Description</Text>
          <TextInput
            style={styles.textBoxes}
            value={props.description}
            onChangeText={(text) => setDescription(text)}
          ></TextInput>
        </View>
        <Button title="Save Changes" onPress={props.saveChanges} color="#0C637F" />
        <TouchableOpacity style={styles.delete} onPress={handleDelete}>
          <Icon type="MaterialCommunityIcons" name="trash-can" style={{ fontSize: 16, color: 'white'}}/>
          <Text style={{color: 'white', marginLeft: 5}}>DELETE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    padding: 10,
    marginBottom: 5,
  },
  header: {
    alignSelf: 'flex-start',
    backgroundColor: '#00C793',
    marginTop: 10,
  },
  headerText: {
    fontWeight: '500',
    padding: 10,
    color: 'white',
    fontSize: 18,
  },
  timer: {
    borderLeftWidth: 1,
    padding: 3,
  },
  delete: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#EF476F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});