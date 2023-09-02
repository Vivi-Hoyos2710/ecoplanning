import requests
import time

from invoke import task


def get_full_container_name(c, name):
    """Given a substring, get the full name of a container"""
    cmd = "".join(
        [
            "docker ",
            "ps ",
            f'--filter "name={name}" ',
            '--format "{{.Names}}" ',
        ]
    )
    result = c.run(cmd)

    full_name = result.stdout.strip()
    if len(full_name) <= 0:
        raise Exception("Could not file container for name {name}")

    return full_name


@task
def debug_django(c):
    """run a stack that allows for debugging the django"""
    c.run("docker-compose up -d")
    container_name = get_full_container_name(c, "django")
    c.run(f"docker rm -f {container_name}")
    c.run("docker-compose run --rm --service-ports django", pty=True)


@task
def pytest(c):
    """Run django manage.py commands"""
    container_name = get_full_container_name(c, "django")
    c.run(
        f'docker exec -it {container_name} pytest\
                --junitxml="./results/backend-results.xml"',
        pty=True,
    )


@task
def test_webapp(c):
    """Run eslint and the react tests"""
    container_name = get_full_container_name(c, "react")
    c.run(
        f"docker exec -it {container_name} npm run lint",
        pty=True,
    )
    c.run(
        f"docker exec -it {container_name} npm run test:report",
        pty=True,
    )


def build_and_start(c):
    c.run("docker-compose build")
    c.run("docker-compose up -d")
    # Make sure yarn install has been completed and postgres DB created
    print("[INFO] Waiting for Front-end app to respond")
    while True:
        try:
            requests.get("http://127.0.0.1:3000")
            break
        except Exception:
            time.sleep(1)
            pass


@task
def test_all(c):
    """Run all tests. Primarily used by CI machines"""
    c.run("flake8 backend")
    build_and_start(c)
    c.run("docker-compose down")
    pytest(c)
    test_webapp(c)
