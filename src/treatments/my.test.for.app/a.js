import { foo } from '../../src/some-shared-thing';

export default class A {
  render({ data }) {
    return `A: ${data.name} ${foo()}`;
  }
}