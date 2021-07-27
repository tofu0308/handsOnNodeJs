'use strict'
const express = require('express')
const {v4: uuidv4} = require('uuid')

// 実行されたスクリプトの名前に応じてデータストレージの実装を使い分ける
const dataStorage = require(`./${process.env.npm_lifesycle_event}`)

const app = express()

app.use(express.json)

