import { Clock } from '../classes';


test('the hour format must be 24h by default', () => {


  let testClockApp = new Clock();

  expect(testClockApp.getHourFormat()).toBe("24h");


});


test('change the light modoe and check if it becomes true', () => {


  let testClockApp = new Clock();

  testClockApp.changeLight()

  expect(testClockApp.getLight()).toBe(true);


});
