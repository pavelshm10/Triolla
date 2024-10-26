import React, { useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Task } from '../../types/task.type';
import { ModalSx } from '../../styles/sxStyles';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (values: Task) => void;
  initialValues: Task;
  isNew: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').trim(),
  description: Yup.string().required('Description is required').trim(),
  priority: Yup.number()
    .min(0, 'Priority must be between 0 and 1')
    .max(1, 'Priority must be between 0 and 1')
    .required('Priority is required'),
});

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleClose,
  onSubmit,
  initialValues,
  isNew,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={ModalSx.modal}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {isNew ? 'Create Task' : 'Update Task'}
        </Typography>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
            handleClose();
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                name="title"
                label="Title"
                sx={{height:70}}

                fullWidth
                margin="normal"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              
              <Field
                as={TextField}
                sx={{height:70}}
                name="description"
                label="Description"
                fullWidth
                margin="normal"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              
              <Field
                as={TextField}
                name="priority"
                label="Priority"
                type="number"
                fullWidth
                margin="normal"
                error={touched.priority && Boolean(errors.priority)}
                helperText={touched.priority && errors.priority}
              />
              
              <Box mt={2} display="flex" justifyContent="center">
                <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  {isNew ? 'Create' : 'Update'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default TaskModal;
