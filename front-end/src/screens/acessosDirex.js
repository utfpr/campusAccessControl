import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Table, Divider, Tag, Row, Button, notification, Icon, Popover, Typography, Modal, Form, Input, DatePicker, TimePicker, Select } from 'antd';
import axios from 'axios';
import NavBar from "../components/navbar/navbar";
import moment from 'moment';
import 'moment/locale/pt-br';
import { Redirect } from 'react-router-dom';
import { getUserId, getAluno } from '../services/auth';

const { Column } = Table;
const { Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;


export default function ListaAcessos() {
  const [acessos, setAcessos] = useState('');
  const [modalState, setModalState] = useState('');
  const [editState, setEditState] = useState(true);
  const [buttonEdit, setButtonEdit] = useState(true);

  //Variáveis de acesso
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [horario, setHorario] = useState(moment().add(-1, 'hours'));
  const [data, setData] = useState(moment());
  const [completo, setCompleto] = useState('');
  const [sala, setSala] = useState('');
  const [ra, setRa] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [status, setStatus] = useState('');
  const [id, setId] = useState('');
  const [pageChange, setPageChange] = useState(false);

  const [detalhes, setDetalhes] = useState(false);

  const [modalVerificar, setModalVerificar] = useState(false);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }
  const dateFormatList = ["DD/MM/YYYY"];
  const format = 'HH:mm';

  useEffect(() => {
    axios.get('http://localhost:4000/acessos/acessos')
      .then(res => {
        let aux = res.data;
        aux.map(acesso => {
          if (acesso.status === 'solicitado') acesso.corStatus = '#db6600';
          if (acesso.status === 'aceito') acesso.corStatus = '#2eb800';
          if (acesso.status === 'rejeitado') acesso.corStatus = '#b80000';
        })
        setAcessos(res.data);
      })
      .catch((err) => {
        console.log(err);
        falha();
      })
  }, [pageChange])

  const sucesso = () => {
    notification.success({
      message: 'Sucesso!',
      description:
        'Solicitação feita com sucesso!',
      icon: <Icon type="check-circle" style={{ color: 'green' }} />,
    });
  }

  const falha = () => {
    notification.error({
      message: 'Erro!',
      description:
        'Algum problema ocorreu!',
      icon: <Icon type="frown" style={{ color: 'red' }} />,
    });
  }

  const show = () => {
    setModalState(true);
  }
  const hide = () => {
    setId();
    setCompleto('');
    setData('');
    setDescricao('');
    setHorario('');
    setJustificativa('');
    setRa('');
    setResponsavel('');
    setStatus('');
    setSala('');
    setModalState(false);
  }

  const handleChangeDatePicker = (date, dateString) => {
    if (date) setData(date._d);
  }

  const handleChangeTimePicker = (time, timeString) => {
    if (time) setHorario(time);
  }

  const criarAcesso = () => {
    let acesso = {};
    acesso.descricao = descricao;
    acesso.responsavel = responsavel;
    acesso.horario = horario;
    acesso.data = data;
    acesso.sala = sala;
    acesso.ra = ra;

    axios
      .post("http://localhost:4000/acessos/criarAcesso", acesso)
      .then((res) => {
        sucesso();
        hide();
        setPageChange(!pageChange);
      }).catch((err) => {
        falha();
        console.log(err);
      })
  }

  const showDetalhes = (e) => {
    setId(e._id);
    setCompleto(e.completo);
    setData(moment(e.data));
    setDescricao(e.descricao);
    setHorario(e.horario);
    setJustificativa(e.justificativa);
    setRa(e.ra);
    setResponsavel(e.responsavel);
    setStatus(e.status);
    setSala(e.sala);
    setDetalhes(true);
  }

  const hideDetalhes = () => {
    setId();
    setCompleto('');
    setData('');
    setDescricao('');
    setHorario('');
    setJustificativa('');
    setRa('');
    setResponsavel('');
    setStatus('');
    setSala('');
    setDetalhes(false);
    disableEdit();
  }

  const enableEdit = () => {
    setEditState(false);
    setButtonEdit(false);
  }

  const disableEdit = () => {
    setEditState(true);
    setButtonEdit(true);
  }

  const handleEdit = () => {
    let acessoNovo = {};
    acessoNovo.id = id;
    acessoNovo.descricao = descricao;
    acessoNovo.responsavel = responsavel;
    acessoNovo.horario = horario;
    acessoNovo.data = data;
    acessoNovo.sala = sala;
    acessoNovo.ra = ra;
    acessoNovo.justificativa = justificativa;
    acessoNovo.status = status;

    axios
      .put("http://localhost:4000/acessos/atualizarAcesso", acessoNovo)
      .then((res) => {
        sucesso();
        hideDetalhes();
        setPageChange(!pageChange);
      }).catch((err) => {
        falha();
        console.log(err);
      })
  }

  const onChangeStatus = (value) => {
    setStatus(value);
  }

  const showVerificar = (e) => {
    setId(e._id);
    setModalVerificar(true);
  }
  const hideVerificar = () => {
    setId('');
    setModalVerificar(false);
  }

  const verificar = () => {
    let acessoNovo = {};
    acessoNovo.id = id;
    acessoNovo.justificativa = justificativa;
    acessoNovo.status = status;

    axios
      .put("http://localhost:4000/acessos/verificarAcesso", acessoNovo)
      .then((res) => {
        sucesso();
        hideVerificar();
        setPageChange(!pageChange);
      }).catch((err) => {
        falha();
        console.log(err);
      })
  }

  // if (!getUserId || getAluno() ) {
    const nois = false;
    if (nois) {
    return (
      <Redirect to={"/"} />
    )
  } else {
    return (
      <NavBar>
        <div>
          <Paragraph style={{ fontSize: 30, textAlign: 'center', marginBottom: 5 }}> Gerenciamento de acessos </Paragraph>
          <Paragraph style={{
            textAlign: 'center',
            marginBottom: 5,
            maxWidth: 500,
            padding: '0 20px', marginLeft: 'auto', marginRight: 'auto'
          }}> Gerenciamento de acessos ao campus em dias não letivos. </Paragraph>

          <Divider style={{ fontSize: 20, minWidth: '60%', width: '60%', marginTop: 0, marginLeft: 'auto', marginRight: 'auto' }}>
            <Icon type="book" />
          </Divider>

          <Row>
            <Button
              type="default"
              icon="plus"
              onClick={show}
              style={{ float: 'right', marginTop: 10, marginBottom: 10 }}
            >Solicitar Acesso</Button>
          </Row>

          <Table dataSource={acessos} style={{ marginTop: 10 }}>
            <Column
              title="RA" dataIndex="ra" key="ra"
              sorter={(a, b) => a.ra.localeCompare(b.ra)}
              filterIcon={filtered => <Icon type="search" style={{ color: filtered ? '#1890FF' : undefined }} />}
              onFilter={(value, record) => record.ra.toString().toLowerCase().includes(value.toLowerCase())}
              filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                  <Input.Search
                    placeholder="Procurar" value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onSearch={() => confirm()}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                  />

                  <Button
                    type="primary" icon="search" size="small" style={{ width: 90, marginRight: 8 }}
                    onClick={() => confirm()}
                  >
                    Procurar
              </Button>

                  <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}> Limpar </Button>
                </div>
              )}
            />
            <Column
              title="Responsável"
              dataIndex="responsavel"
              key="responsavel"
            />
            <Column
              title="Data" dataIndex="data"
              key="data" defaultSortOrder='ascend'
              render={date => moment(date).format('DD/MM/YYYY')}
              sorter={(a, b) => moment(a.data).isSameOrAfter(moment(b.data)) ? 1 : -1}
            />

            <Column
              title="Horário" dataIndex="horario"
              key="data" defaultSortOrder='ascend'
              render={date => moment(date).format('HH:mm')}
              sorter={(a, b) => moment(a.horario).isSameOrAfter(moment(b.horario)) ? 1 : -1}
            />

            <Column
              title="Local"
              dataIndex="sala"
              key="local"
            />

            <Column
              title="Status"
              dataIndex="status"
              key="status"
              render={(id, record) => (<Tag color={record.corStatus}>{record.status}</Tag>)}
            />

            <Column
              title="Ações"
              dataIndex="_id"
              render={(id, record) => (
                <Button.Group>
                  <Popover content='Detalhes e Edição do acesso'>
                    <Button type="default" size="small" onClick={() => { showDetalhes(record) }} >
                      <Icon type="eye" theme="twoTone" twoToneColor="#4B7BEC" />
                    </Button>
                  </Popover>
                  <Popover content='Verificar acesso'>
                    <Button type="default" size="small" onClick={() => { showVerificar(record) }} >
                      <Icon type="check-circle" color="#4B7BEC" />
                    </Button>
                  </Popover>
                </Button.Group>
              )}
            />

          </Table>

          <Modal
            title="Verificar acesso"
            visible={modalVerificar}
            onCancel={hideVerificar}
            onOk={verificar}
            cancelText="Cancelar"
            okText="Confirmar"
          >
            <Form  {...formItemLayout}>
              <Form.Item label="Status:">
                {(
                  <Select
                    placeholder="Estado da solicitação de acesso"
                    onChange={onChangeStatus}
                    defaultValue={status}
                  >
                    <Option value="solicitado">Solicitado</Option>
                    <Option value="aceito">Aceito</Option>
                    <Option value="rejeitado">Rejeitado</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Justificativa:">
                <TextArea
                  value={justificativa}
                  placeholder="Justificativa para a rejeição ou aceitação da solicitação de acesso"
                  onChange={e => setJustificativa(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Solicitar acesso"
            visible={modalState}
            onOk={criarAcesso}
            okText="Solicitar"
            onCancel={hide}
            cancelText="Cancelar"
          >
            <Form  {...formItemLayout}>
              <Form.Item label="RA: ">
                <Input
                  placeholder="Número do RA (sem o 'a')"
                  onChange={e => setRa(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Responsável: ">
                <Input
                  placeholder="Nome do responsável"
                  onChange={e => setResponsavel(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Data: ">
                <DatePicker
                  onChange={handleChangeDatePicker}
                  format={dateFormatList}
                  defaultValue={moment(data, dateFormatList)}
                  showToday={false}
                />
              </Form.Item>

              <Form.Item label="Horário: ">
                <TimePicker
                  defaultValue={moment(horario, format)}
                  format={format}
                  onChange={handleChangeTimePicker}
                />
              </Form.Item>

              <Form.Item label="Local:">
                <Input
                  placeholder="Sala ou outro local"
                  onChange={e => setSala(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Descrição:">
                <TextArea
                  placeholder="Para que propósito o local reservado será usado"
                  onChange={e => setDescricao(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title="Detalhes do acesso"
            visible={detalhes}
            footer={[
              <Button type="danger" onClick={hideDetalhes}>
                Fechar
            </Button>,
              <Button type="primary" onClick={enableEdit}>
                Habilitar Edição
            </Button>,
              <Button type="primary" onClick={handleEdit} disabled={buttonEdit} style={{ backgroundColor: '#00bf46', borderColor: '#00bf46' }}>
                Submeter mudanças
            </Button>
            ]}
          >
            <Form  {...formItemLayout}>
              <Form.Item label="RA: ">
                <Input
                  disabled={editState}
                  style={{ color: '#3a3d3b' }}
                  value={ra}
                  placeholder="Número do RA (sem o 'a')"
                  onChange={e => setRa(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Responsável: ">
                <Input
                  disabled={editState}
                  style={{ color: '#3a3d3b' }}
                  value={responsavel}
                  placeholder="Nome do responsável"
                  onChange={e => setResponsavel(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Data: ">
                <DatePicker
                  disabled={editState}
                  style={{ textColor: '#3a3d3b' }}
                  onChange={handleChangeDatePicker}
                  format={dateFormatList}
                  defaultValue={moment(data, dateFormatList)}
                  showToday={false}
                />
              </Form.Item>

              <Form.Item label="Horário: ">
                <TimePicker
                  disabled={editState}
                  style={{ textColor: '#3a3d3b' }}
                  defaultValue={moment(horario, format)}
                  format={format}
                  onChange={handleChangeTimePicker}
                />
              </Form.Item>

              <Form.Item label="Local:">
                <Input
                  disabled={editState}
                  style={{ color: '#3a3d3b' }}
                  value={sala}
                  placeholder="Sala ou outro local"
                  onChange={e => setSala(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Descrição:">
                <TextArea
                  disabled={editState}
                  style={{ color: '#3a3d3b' }}
                  value={descricao}
                  placeholder="Para que propósito o local reservado será usado"
                  onChange={e => setDescricao(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Status:">
                {(
                  <Select
                    onChange={onChangeStatus}
                    defaultValue={status}
                    style={{ color: '#3a3d3b' }}
                    disabled={editState}
                  >
                    <Option value="solicitado">Solicitado</Option>
                    <Option value="aceito">Aceito</Option>
                    <Option value="rejeitado">Rejeitado</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item label="Justificativa:">
                <TextArea
                  disabled={editState}
                  style={{ color: '#3a3d3b' }}
                  value={justificativa}
                  placeholder="Porque foi aceito ou rejeitado"
                  onChange={e => setJustificativa(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </NavBar>

    )
  }
}