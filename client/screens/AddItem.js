import { useMutation, useQuery } from '@apollo/client';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, Image, ScrollView,
  Text,



  TextInput,


  TouchableHighlight, TouchableOpacity,

  TouchableWithoutFeedback, View
} from 'react-native';
import Navbar from '../components/Navbar';
import { CREATE_ITEM, GET_CATEGORIES } from '../queries/addItem';

const windowWidth = Dimensions.get('window').width;

export default function AddItem({ navigation, route }) {
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [createItem, { data, error, loading }] = useMutation(CREATE_ITEM);
  const categories = useQuery(GET_CATEGORIES);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showModal, setModal] = useState();

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data) {
      navigation.navigate('Item', { id: data.create_item.id });
    }
  }, [data]);

  useEffect(() => {
    console.log('selectedCategories: ', selectedCategories);
  }, [selectedCategories]);

  const { email } = route.params;

  function handleCurrency(input) {
    if (input) {
      if (input.search(/[^0-9,]/g) === -1) {
        // if string only contains (0123456789,)
        if (input.indexOf(',') !== -1) {
          input = input.slice(0, input.indexOf(',') + 3);
          if (input.search(/(,).*\1/g) === -1) {
            // if string doesn't contain multiple commas
            setPrice(input);
          }
        } else {
          setPrice(input);
        }
      } else {
        console.log('invalid character');
      }
    } else {
      setPrice(input);
    }
  }

  function handleSubmit() {
    const queryVariables = {
      userId: '2960b4a0-0036-4583-a966-28d03d91d021',
      item: {
        name: title,
        minPrice: parseInt(price),
        description: description,
      },
      categoryId: selectedCategories[0].id,
    };

    console.log(queryVariables);

    createItem({ variables: queryVariables });
  }

  function handleCategories(cat) {
    setSelectedCategories((selArr) => {
      let initialLength = selArr.length;
      let reduced = selArr.reduce((accumulator, current) => {
        if (current.id !== cat.id) accumulator.push(current);
        return accumulator;
      }, []);

      if (initialLength === reduced.length) return [cat, ...reduced];
      else return reduced;
    });
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    console.log(result);
    const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/madhushree25/image/upload";
    if (!result.cancelled) {
      setImages(imgs => [...imgs, result.uri]);
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      let data = {
      "file": base64Img,
      "upload_preset": "ofoblmjj",
      }

      fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      console.log(data.secure_url);
    });
    }
  }

  return (
    <>
      <Navbar navigation={navigation} canGoBack={true} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <Text>Title:</Text>
        <TextInput
          style={styles.textBoxes}
          onChangeText={(text) => setTitle(text)}
        />
        <Text>Starting Price:</Text>
        <TextInput
          style={styles.textBoxes}
          value={price}
          onChangeText={(text) => handleCurrency(text)}
          keyboardType="numeric"
          placeholder="0,00"
        />
        <Text>Description:</Text>
        <TextInput
          style={styles.textBoxes}
          onChangeText={(text) => setDescription(text)}
        />
        <Text>Categories:</Text>
        <View style={styles.selectedCategories}>
          {selectedCategories.map((cat, index) => (
            <Text key={index} style={styles.selectedCategory}>
              {cat.name}
            </Text>
          ))}
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setModal(true);
            setSelectedCategories([]);
          }}
        >
          <Text
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: 'gray',
              marginTop: 10,
            }}
          >
            Pick Categories
          </Text>
        </TouchableWithoutFeedback>
        <View style={styles.itemView}>
          {images.length > 0
            ? images.map((img, index) => (
                <Image
                  key={index}
                  style={styles.itemImage}
                  source={{ uri: img }}
                />
              ))
            : null}
          <TouchableOpacity onPress={pickImage}>
            <Image
              style={styles.itemImage}
              source={require('../assets/plus.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableHighlight style={styles.addItemButton} onPress={handleSubmit}>
          <Text style={{ fontSize: 18, color: 'white' }}>ADD ITEM</Text>
        </TouchableHighlight>
      </ScrollView>
      {showModal ? (
        <View style={styles.categoryModal}>
          <ScrollView style={styles.categoryModalContent}>
            <Text
              style={{
                padding: 15,
                backgroundColor: 'lightgray',
                fontSize: 18,
                fontFamily: 'Roboto_medium',
              }}
            >
              CATEGORIES
            </Text>
            {categories.data
              ? categories.data.get_categories.map((cat) => {
                  return (
                    <CategoryModalField
                      key={cat.id}
                      category={cat}
                      handleCategories={handleCategories}
                    />
                  );
                })
              : null}
          </ScrollView>
          <TouchableHighlight onPress={() => setModal(false)}>
            <Text
              style={{
                textAlign: 'center',
                backgroundColor: 'lightgray',
                padding: 10,
                fontFamily: 'Roboto_medium',
              }}
            >
              Submit
            </Text>
          </TouchableHighlight>
        </View>
      ) : null}
    </>
  );

function CategoryModalField({ category, handleCategories }) {
  const [active, setActive] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setActive((act) => {
          return !act;
        });
        handleCategories(category);
      }}
    >
      <View style={styles.categoryField}>
        <Text style={[{ fontSize: 16 }, styles.text]}>{category.name}</Text>
        <View
          style={[
            styles.selected,
            active ? { backgroundColor: 'lightblue' } : null,
          ]}
        ></View>
      </View>
    </TouchableWithoutFeedback>
  );
}
}

