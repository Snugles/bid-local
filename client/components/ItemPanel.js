import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Timer from '../components/Timer';
import { UPDATE_ITEM } from '../queries/usersListedItems';
import { useMutation } from '@apollo/client';
import bidSubscription from '../queries/subscription';
import ExpandableComponent from './PanelExpansion';

export default function Panel(props) {
  bidSubscription();
  const [isExpanded, setIsExpanded] = useState(false);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [title, setTitle] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [changeItem, { data }] = useMutation(UPDATE_ITEM);

  useEffect(() => {
    if (isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [isExpanded]);

  function saveChanges() {
    const queryVariables = {
      itemId: props.id,
      item: {
        name: title,
        minPrice: props.price,
        description: description,
      },
    };

    changeItem({ variables: queryVariables });
  }

  useEffect(() => {
    if (data?.update_item) {
      setTitle(data.update_item.name);
      setDescription(data.update_item.description);
    }
  },[data]);

  function updateLayout() {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView
      style={{
        borderWidth: 5,
        borderStyle: 'solid',
        borderColor: '#00C793',
        width: '100%',
        marginTop: 15,
      }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ marginRight: 'auto' }}>
            <Text style={styles.titleText}>{title}</Text>
            <Text>{props.price + '€'}</Text>
          </View>
          <View style={styles.timer}>
            <Text>Time:</Text>
            <Timer deadline={props.deadline} />
          </View>
        </View>
        <View>
          <ExpandableComponent
            deleteItem={props.deleteItem}
            id={props.id}
            saveChanges={saveChanges}
            description={description}
            title={title}
            setTitle={setTitle}
            setDescription={setDescription}
            onClickFunction={() => {
              updateLayout(0);
            }}
            layoutHeight={layoutHeight}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexShrink: 0,
    padding: 10,
  },
  titleText: {
    flexShrink: 0,
    width: '95%',
    fontSize: 22,
    fontWeight: 'bold',
    width: '100%',
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
  textBoxes: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EF476F',
    padding: 10,
    marginBottom: 5,
  },
  text: {
    width: '95%',
    fontSize: 16,
  },
  content: {
    width: '95%',
    backgroundColor: '#fff',
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
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontFamily: 'Roboto_medium',
  },
  loading: {
    fontFamily: 'Roboto_medium',
    fontSize: 50,
    color: '#67A036',
    marginTop: '60%',
    textAlign: 'center',
    marginBottom: '-40%',
    zIndex: 1,
  },
});