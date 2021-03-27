import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { Button } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import TextArea from '../../app/common/form/TextArea';

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore();
    return (
        <Formik
            initialValues={{displayName: profile?.displayName, bio: profile?.bio}}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
            validationSchema={Yup.object({
                displayName: Yup.string().required()
            })}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className='ui form'>
                    <TextInput name='displayName' placeholder='Display Name' />
                    <TextArea rows={3} name='bio' placeholder='Add your bio' />
                    <Button
                        disabled={!isValid || !dirty}
                        loading={isSubmitting}
                        positive
                        content='Update Profile'
                        type='submit'
                        floated='right'
                    />
                </Form>
            )}
        </Formik>
    )
})