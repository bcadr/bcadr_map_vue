import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';
import {Button} from 'ant-design-vue'
import {Form} from 'ant-design-vue'
import {FormModel} from 'ant-design-vue'
import {Input} from 'ant-design-vue'


const components = [Button,Form,FormModel,Input];

components.map(component => {
    Vue.use(component);
})
