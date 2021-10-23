import Field from './Field'
import { useForm, set } from 'react-cool-form'
import * as yup from 'yup'
import { Wrapper } from './ContactList'
import { Button, ButtonRow } from './ContactView'
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction, contactByIdSelector, updateContactAction } from '../store/contacts'
import { useParams, useHistory } from 'react-router-dom';

const ContactForm = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const {id} = useParams()
    const contact = useSelector(state => contactByIdSelector(state, parseInt(id)))

    const yupSchema = yup.object().shape({
        firstName: yup.string().min(2).required(),
        lastName: yup.string().min(2).required(),
        email: yup.string().email().required(),
        phone: yup.number().min(7).required(),
        address: yup.string().min(8).required(),
        description: yup.string().min(5).required()
    })

    const validateWithYup = (schema) => async (values) => {
        let errors = {};
        try {
            await schema.validate(values, { abortEarly: false })
        } catch (yupError) {
            yupError.inner.forEach(({ path, message }) => set(errors, path, message))
        }
        return errors
    }

    const { form, use } = useForm({
        defaultValues: contact ? { firstName: `${contact.firstName}`, lastName: `${contact.lastName}`, email: `${contact.email}`, phone: `${contact.phone}`, address: `${contact.address}`, description: `${contact.description}`} :{ firstName: '', lastName: '', email: '', phone: '', address: '', description: '' },
        validate: validateWithYup(yupSchema),
        onSubmit: (values, {reset}) => {
            console.log(values);
            if(contact){
                dispatch(updateContactAction({...values, id:contact.id}))
                history.push(`/contacts/${contact.id}`)
            }else{
            dispatch(addContactAction(values));}
            reset()
        }
    })

    const errors = use('errors', { errorWithTouched: true });

    return (
        <Wrapper>
            {contact ?<h2>Edit contact</h2> :<h2>Add new contact</h2> }      
            <form ref={form} noValidate>
                <Field name='firstName'
                    placeholder='type name'
                    error={errors.firstName} />
                <Field name='lastName'
                    placeholder='type last name'
                    error={errors.lastName} />
                <Field name='phone'
                    placeholder='type phone number'
                    error={errors.phone} />
                <Field name='email'
                    placeholder='type email'
                    error={errors.email} />
                <Field name='address'
                    placeholder='type address'
                    error={errors.address} />
                <Field name='description'
                    placeholder='contact description'
                    error={errors.description} />
                <ButtonRow>
                    <Button >{contact ? 'save':'add contact'}</Button>
                </ButtonRow>
            </form>
        </Wrapper>
    )
}

export default ContactForm;