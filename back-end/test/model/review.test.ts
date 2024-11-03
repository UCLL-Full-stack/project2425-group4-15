import { Review } from '../../model/review';
import { User } from '../../model/user';

test('given: valid values for review fields; when: Review is created; then: fields are set correctly and review is created', () => {
    const user = new User({
        id: 1,
        username: 'reviewer',
        email: 'reviewer@example.com',
        password: 'password123',
    });
    const review = new Review({
        id: 1,
        content: 'Great movie!',
        rating: 4,
        user: user,
        reviewDate: new Date('2023-01-01'),
    });

    expect(review.getId()).toEqual(1);
    expect(review.getContent()).toEqual('Great movie!');
    expect(review.getRating()).toEqual(4);
    expect(review.getUser()).toEqual(user);
    expect(review.getReviewDate()).toEqual(new Date('2023-01-01'));
});
