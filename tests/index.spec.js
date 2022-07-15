import app from '../src/app'
import request from 'supertest'

describe('Should verify if Get /tasks', () => {
  test('should respond with a 200 status code', async () => {
    const resp = await request(app).get('/tasks').send()
    expect(resp.statusCode).toBe(200)
  })

  test('should respond with', async () => {
    const resp = await request(app).get('/tasks').send()
    expect(resp.body).toBeInstanceOf(Array)
  })
});

describe('POST /tasks', () => {
  describe('given a title and description', () => {

    const newTask = {
        title: 'Test task',
        description: 'Test description'
    }
    test('Should  respond with a 200 status code', async () => {
      const resp = await request(app).post('/tasks').send(newTask)
      expect(resp.statusCode).toBe(200)
    })

    test('Should have a content-type: application/json in headers', async () => {
      const resp = await request(app).post('/tasks').send(newTask)
      expect(resp.headers['content-type']).toEqual(
        expect.stringContaining('json'),
      )
    })

    test('should respond with an task ID', async () => {
      const resp = await request(app).post('/tasks').send(newTask)
      expect(resp.body.id).toBeDefined()
    })
  })
});

describe('when title and description is missing', () => {
    test('should respond with a 200 status code', async () => {
        const fields = [
            {},
            {title: 'Test task'},
            {description: 'Test description'},
        ];

        for (const field of fields) {
            const resp = await request(app).post('/tasks').send(field)
            expect(resp.statusCode).toBe(400)
            
        }
    })
})
