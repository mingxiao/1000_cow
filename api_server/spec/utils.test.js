import {getConnection} from '../src/utils'
import * as typeorm from 'typeorm'

describe('#getConnection', () => {
  let mockConnectionManager;
  const fakeConnection = {name: 'some-con'};

  describe('when given a connection name', () => {
    beforeEach(() => {
      mockConnectionManager = {
        has: jest.fn().mockReturnValue(true),
        get: jest.fn().mockReturnValue(fakeConnection),
      }
      typeorm.getConnectionManager = jest.fn().mockReturnValue(mockConnectionManager)
    })

    it('uses that name', () => {
      const connection = getConnection('main')
      expect(mockConnectionManager.has).toHaveBeenCalledWith('main')
      expect(mockConnectionManager.get).toHaveBeenCalledWith('main')
      expect(connection).toEqual(fakeConnection)
    })
  })

  describe('defaults to "test"', () => {
    describe('when a connection exists', () => {
      beforeEach(() => {
        mockConnectionManager = {
          has: jest.fn().mockReturnValue(true),
          get: jest.fn().mockReturnValue(fakeConnection),
        }
        typeorm.getConnectionManager = jest.fn().mockReturnValue(mockConnectionManager)
      })

      it('gets that connection', () => {
        const connection = getConnection()
        expect(mockConnectionManager.has).toHaveBeenCalledWith('test')
        expect(mockConnectionManager.get).toHaveBeenCalledWith('test')
        expect(connection).toEqual(fakeConnection)
      })
    })

    describe('when a connection does not exist', () => {
      beforeEach(() => {
        mockConnectionManager = {
          has: jest.fn().mockReturnValue(false),
          create: jest.fn().mockReturnValue(fakeConnection),
        }
        typeorm.getConnectionManager = jest.fn().mockReturnValue(mockConnectionManager)
      })

      it('creates a new connection', () => {
        const connection = getConnection()
        expect(mockConnectionManager.has).toHaveBeenCalledWith('test')
        expect(mockConnectionManager.create).toHaveBeenCalled()
        expect(connection).toEqual(fakeConnection)
      })
    })
  })
})