import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Table, Divider, Tag, Row, Button, notification, Icon, Popover, Typography, Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import axios from 'axios';
import NavBar from "../components/navbar/navbar";
import moment from 'moment';
import 'moment/locale/pt-br';

const { Column } = Table;
const { Paragraph } = Typography;
const { TextArea } = Input;


export default function ListaAcessos() {
  const [acessos, setAcessos] = useState('');

  //Variáveis de acesso
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [horario, setHorario] = useState();
  const [data, setData] = useState();
  const [sala, setSala] = useState('');
  const [ra, setRa] = useState('');
  const [justificativa, setJustificativa] = useState('');
  const [status, setStatus] = useState('');

  const [detalhes, setDetalhes] = useState(false);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }
  const dateFormatList = ["DD/MM/YYYY"];
  const format = 'HH:mm';

  useEffect(() => {
    axios.get('http://localhost:4000/acessos/acessosDeHoje')
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
  }, [])

  const falha = () => {
    notification.error({
      message: 'Erro!',
      description:
        'Algum problema ocorreu!',
      icon: <Icon type="frown" style={{ color: 'red' }} />,
    });
  }

  const showDetalhes = (e) => {
    setData(e.data);
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
    setData('');
    setDescricao('');
    setHorario('');
    setJustificativa('');
    setRa('');
    setResponsavel('');
    setStatus('');
    setSala('');
    setDetalhes(false);
  }

  return (
    <NavBar btn='0'>
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
                <Popover content='Ver detalhes do acesso'>
                  <Button type="default" size="small" onClick={() => {showDetalhes(record) }} >
                    <Icon type="eye" theme="twoTone" twoToneColor="#4B7BEC" />
                  </Button>
                </Popover>
              </Button.Group>
            )}
          />

        </Table>
        
        <Modal
          title="Detalhes do acesso"
          visible={detalhes}
          onCancel={hideDetalhes}
          footer={[
            <Button type="primary" key="back" onClick={hideDetalhes}>
              Fechar
            </Button>
          ]}
        >
          <Form  {...formItemLayout}>
            <Form.Item label="RA: ">
              <Input
                disabled={true}
                style={{color:'#3a3d3b'}}
                value={ra}
                placeholder="Número do RA (sem o 'a')"
              />
            </Form.Item>

            <Form.Item label="Responsável: ">
              <Input
                disabled={true}
                style={{color:'#3a3d3b'}}
                value={responsavel}
                placeholder="Nome do responsável"
              />
            </Form.Item>

            <Form.Item label="Data: ">
              <DatePicker
                value={moment(data)}
                disabled={true}
                style={{textColor:'#3a3d3b'}}
                format={dateFormatList}
                defaultValue={moment(data)}
                // showToday={false}
              />
            </Form.Item>

            <Form.Item label="Horário: ">
              <TimePicker
                value={moment(horario)}
                disabled={true}
                style={{textColor:'#3a3d3b'}}
                defaultValue={moment(horario)}
                format={format}
              />
            </Form.Item>

            <Form.Item label="Local:">
              <Input
                disabled={true}
                style={{color:'#3a3d3b'}}
                value={sala}
                placeholder="Sala ou outro local"
              />
            </Form.Item>
            <Form.Item label="Descrição:">
              <TextArea
                disabled={true}
                style={{color:'#3a3d3b'}}
                value={descricao}
                placeholder="Para que propósito o local reservado será usado"
              />
            </Form.Item>

            <Form.Item label="Local:">
              <Input
                disabled={true}
                style={{color:'#3a3d3b'}}
                value={sala}
                placeholder="Sala ou outro local"
              />
            </Form.Item>

            <Form.Item label="Status:">
              <Input
                disabled={true}
                style={{color:'#3a3d3b'}}
                value={status}
              />
            </Form.Item>

            <Form.Item label="Justificativa:">
              <TextArea
                disabled={true}
                style={{color:'#3a3d3b'}}
                value={justificativa}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </NavBar>

  )
}
