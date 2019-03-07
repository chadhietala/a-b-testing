import { foo } from './src/some-shared-thing';
import { getSnapShot, lookup } from './lib';


class IndexRoute {
  async model() {
    this.treatments = await getSnapShot('my.test.for.app', 'my.infra.thing');
    return {
      data: { name: 'Chad' },
      treatments: this.treatments
    }
  }

  render(model) {
    let Component = lookup('my.test.for.app');
    let component = new Component();
    return component.render(model);
  }
}

const ROUTES = {
  '/': IndexRoute
}

class MyApp {

  async visit(url) {
    let route = new ROUTES[url]();
    let model = await route.model();
    let el = document.createElement('div');
    el.innerHTML = route.render(model) + ' ' + foo();
    document.body.appendChild(el);
  }
}

let app = new MyApp();
app.visit('/');