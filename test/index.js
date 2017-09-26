const expect = require('chai').expect
const httpMocks = require('node-mocks-http')
const sinon = require('sinon')

const cors = require('../index')

const avalibleOrigins = ['http://localhost:4800']

describe('cors OPTION request', () => {
    
    const req = httpMocks.createRequest({
        method:'OPTIONS'
    })
    const res = httpMocks.createResponse()
    const next = sinon.spy()
    cors(avalibleOrigins)(req, res, next)

    it('should send status 200', () => { 
        expect(res._getStatusCode()).to.eq(200)
    })
    it('should not call next', () => {
        expect(next.callCount).to.eq(0)
    })
})


describe('cors request success', () => {
    const req = httpMocks.createRequest({
        method: 'GET',
        headers: {
            origin:'http://localhost:4800'
        }
    })
    const res = httpMocks.createResponse()
    const next = sinon.spy()
    cors(avalibleOrigins)(req, res, next)

    it('should call next on not OPTION request', () => { 
        expect(next.callCount).to.eq(1)
    })
    it('should set Access-Control-Allow-Headers', () => { 
        expect(res._getHeaders()['Access-Control-Allow-Headers']).to.contain('Authorization')
    })
    it('should set Access-Control-Allow-Origin', () => { 
        expect(res._getHeaders()['Access-Control-Allow-Origin']).to.eq('http://localhost:4800')
    })
})


describe('cors request from not allowe origin', () => { 
    const req = httpMocks.createRequest({
        method: 'GET',
        headers: {
            origin: 'http://veryEvilSite.evil'
        }
    })
    const res = httpMocks.createResponse()
    const next = sinon.spy()
    cors(avalibleOrigins)(req, res, next)

    it('should call next on not OPTION request', () => {
        expect(next.callCount).to.eq(1)
    })
    it('should not set Access-Control-Allow-Origin', () => { 
        expect(res._getHeaders()['Access-Control-Allow-Origin']).to.not.exist
    })
})