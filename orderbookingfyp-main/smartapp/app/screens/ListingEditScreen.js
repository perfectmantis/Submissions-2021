import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import UploadScreen from '../screens/UploadScreen';
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  AppSubmitButton,
} from '../components/forms';
import CategoryPickerItem from '../components/CategoryPickerItem';
import AppFormImagePicker from '../components/forms/AppFormImagePicker';
import listingsApi from '../api/listings';
import useLocation from '../hooks/useLocation';
import AppText from '../components/AppText';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(1000).label('Price'),
  description: Yup.string().min(1).label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image.'),
});

const categories = [
  {
    label: 'Furniture',
    value: 1,
    backgroundColor: '#fc5c65 ',
    icon: 'floor-lamp',
  },
  { label: 'Cars', value: 2, backgroundColor: '#fd9644', icon: 'car' },
  { label: 'Camera', value: 3, backgroundColor: '#fed330', icon: 'camera' },
  { label: 'Games', value: 4, backgroundColor: '#26de81', icon: 'cards' },
  {
    label: 'Clothing',
    value: 5,
    backgroundColor: '#2bcbba',
    icon: 'shoe-heel',
  },
  { label: 'Sports', value: 6, backgroundColor: '#45aaf2', icon: 'basketball' },
  { label: 'Movies', value: 7, backgroundColor: '#4b7bec', icon: 'headphones' },
  { label: 'Books', value: 8, backgroundColor: '#4b7bec', icon: 'headphones' },
  { label: 'Other', value: 9, backgroundColor: '#4b7bec', icon: 'headphones' },
];

export default function ListingEditScreen() {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const response = await listingsApi.addListing(
      { ...listing, location },
      (progess) => setProgress(progess)
    );

    if (!response.ok) {
      setUploadVisible(false);
      return alert("Couldn't save the listing.");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        visible={uploadVisible}
        progress={progress}
        onDone={() => setUploadVisible(false)}
      />
      <AppText>Add Order</AppText>
      <AppForm
        initialValues={{
          customer: '',
          data: '02-12-2021',
          description: '',
          amount: null,
          paymentStatus: 'Ready',
          orderStatus: 'Ready',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* <AppFormImagePicker name="images" /> */}
        <AppFormField name='customer' maxLength={255} placeholder='Customer' />
        <AppFormField
          name='amount'
          keyboardType='numeric'
          maxLength={8}
          placeholder='Price'
        />
        {/* <AppFormPicker
          name="category"
          items={categories}
          placeholder="Category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
        /> */}
        <AppFormField
          name='description'
          maxLength={255}
          placeholder='Order Details'
          multiLine
          numberOfLines={3}
        />
        <AppSubmitButton title='Post' />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
