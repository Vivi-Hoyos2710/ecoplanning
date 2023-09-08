import React from 'react';
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full  sm:max-w-md">
        <Card shadow={true} className="shadow-lg mt-6 rounded-t-lg p-4">
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-4 space-y-4">
            <Input size="lg" label="Name" />
            <Input size="lg" label="Email" />
            <Input type="password" size="lg" label="Password" />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree to the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
            />
            <Button fullWidth>
              Register
            </Button>
          </form>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="#" className="font-medium text-gray-900">
              Sign In
            </a>
          </Typography>
        </Card>
      </div>
    </div>
  );
};

export default Login;
