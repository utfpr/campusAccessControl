import { Divider, Typography, Layout, Form, Row, Col, Icon, Input, Button, Tooltip } from 'antd';
import React, {Component} from 'react';
import ReactDOM from "react-dom";
// import "antd/dist/antd.css";
import "./css-criar-acesso.css";
import axios from 'axios';
import { string } from 'prop-types'; 
import { getUserId } from './services/auth';

import NavBar from './navbar/navbar';

const { Title } = Typography;
const { Content } = Layout;
// Return the errors in hte fields
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CriarAcesso extends React.Component {
  constructor(props) {
    super(props);  
    
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeResponsible = this.onChangeResponsible.bind(this);  
    this.onChangeHorario = this.onChangeHorario.bind(this); 
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);

    this.state = { 
      todo_description: '',
      todo_responsible: '',
      todo_horario: '',  
      todo_date: '',
      todo_room:'', 
      todo_userid:'',
      todo_completed: false
    }
  }

  onChangeDescription(e) {
    this.setState({
        todo_description: e.target.value
    });
  } 

  onChangeResponsible(e) {
    this.setState({
        todo_responsible: e.target.value
    });
  }

  onChangeHorario(e) {
    this.setState({
        todo_horario: e.target.value
    });
  }

  onChangeRoom(e) {
    this.setState({
        todo_room: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
        todo_date: e.target.value
    });
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.tags = ['Solicitado'] ; 
        values.todo_userid = getUserId();
        console.log('Received values of form: ', values); 
        axios.post('http://localhost:4000/todos/add', values)
            .then(res => console.log(res.data));
            const idusuario = getUserId();                       
            this.props.history.push('/useraccesslist/'+idusuario);  
        this.setState({ 
          todo_description: '',
          todo_responsible: '',
          todo_horario: '',  
          todo_date: '',
          todo_room:'', 
          todo_userid:'',
          todo_completed: false
        })
      }
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
      },
    };

    // Only show error after a field is touched.
    const descriptionError = isFieldTouched('todo_description') && getFieldError('todo_description');
    const responsibleError = isFieldTouched('todo_responsible') && getFieldError('todo_responsible');
    const dateError = isFieldTouched('todo_date') && getFieldError('todo_date');
    const roomError = isFieldTouched('todo_room') && getFieldError('todo_room');
    const horarioError = isFieldTouched('todo_horario') && getFieldError('todo_horario');

    return ( 
      <Layout style = {{ minHeight: '100vh', width: '100%' }}>
         <NavBar /> 
        <Layout>
        {/**  <LateralMenu pagina = "createadminuser" />      */}

          <Content className = "contentLayoutForm" style = {{ padding: "30px 20px 0px 20px" }} >
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Title className = "titleForm" level={1}> Cadastrar um novo Acesso </Title>
              <Divider className = "dividerForm" />
              <Row>
                <Form.Item
                  validateStatus={descriptionError ? 'error' : ''} help={descriptionError || ''}
                  label={
                    <span>
                      Motivo do acesso&nbsp;
                      <Tooltip title="Qual é o motivo do acesso?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('todo_description', {
                    rules: [{ required: true, message: 'Insira o motivo!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>
              </Row>

              {/* Responsável */}
              <Row>
                <Form.Item
                  validateStatus={responsibleError ? 'error' : ''} help={responsibleError || ''}
                  label={
                    <span>
                      Responsável pelo acesso&nbsp;
                      <Tooltip title="Qual o nome responsável?">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('todo_responsible', {
                    rules: [{ required: true, message: 'Insira o nome responsável!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>
              </Row>

              {/* Horário */}
              <Row>
                  <Form.Item
                    validateStatus={horarioError ? 'error' : ''} help={horarioError || ''}
                    label={
                      <span>
                        Horário&nbsp;
                        <Tooltip title="Qual o horário?">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('todo_horario', {
                      rules: [{  message: 'Esse não é um horário!' },
                      { required: true, message: 'Insira o horário!', whitespace: true }],
                    })(<Input type = "time"/>)}
                  </Form.Item>
              </Row>

              {/* data */}
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    validateStatus={dateError ? 'error' : ''} help={dateError || ''}
                    label={
                      <span>
                        Data do acesso&nbsp;
                        <Tooltip title="Insira uma data">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('todo_date', {
                      rules: [{ required: true, message: 'Insira uma data!' }],
                    })(<Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="date"
                    />)}
                  </Form.Item>
                </Col>

              {/* Admin User's confirm password */}
                <Col span={12}>
                  <Form.Item
                    validateStatus={roomError ? 'error' : ''} help={roomError || ''}
                    label={
                      <span>
                        Confirme o local&nbsp;
                        <Tooltip title="Confirme a sala">
                          <Icon type="question-circle-o" />
                        </Tooltip>
                      </span>
                    }
                  >
                    {getFieldDecorator('todo_room', {
                      rules: [{ required: true, message: 'Confirme a sala!' }],
                    })(<Input
                        placeholder="Confirmar sala"
                    />)}
                  </Form.Item>
                </Col>
              </Row>
              
              {/* Submit Button */}
              <Row className="buttonForm">
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Form.Item>
                    <Button className="buttonForm" type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                      Cadastrar
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Content>
        </Layout>
{/**        <Footer />  */}
      </Layout>
    );
  }
}

const WrappedAdminUserForm = Form.create({ name: 'horizontal_acessoform' })(CriarAcesso);
 export default WrappedAdminUserForm;
