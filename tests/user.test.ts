import User from '../src/user';
import Database from '../src/database';

jest.mock('../src/database');

describe('User', () => {
    test('Should create an instance of User correctly', () => {
        const user = new User(1, 'Joe');
        
        expect(user.id).toBe(1);
        expect(user.name).toBe('Joe');
    });

    test('Should obtain users from the database', async () => {
        const mockData = [{ id: 1, name: 'Joe' }];

        (Database.getInstance as jest.Mock).mockReturnValue({
            connect: jest.fn(),
            query: jest.fn().mockResolvedValue(mockData),
        });

        const users = await User.obtainAll();

        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('Joe');
    });
});