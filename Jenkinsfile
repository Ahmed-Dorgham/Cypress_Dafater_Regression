pipeline {
    agent any   // أي node متاح في Jenkins

    environment {
        CYPRESS_BROWSER = "firefox"   // لتشغيل Cypress على Firefox
    }

    stages {
        stage('Checkout Repo B') {
            steps {
                // نعمل clone ل Repo B branch main
                git branch: 'main', url: 'https://github.com/Ahmed-Dorgham/Cypress_Dafater_Regression.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "Running Cypress tests on Firefox (headed, specific spec)..."
                bat 'npx cypress run --browser firefox --headed --spec "cypress/e2e/Regression/Adding Items Suite/Adding Items Suite.cy.js"'
            }
        }
    }

    post {
        always {
            echo "Pipeline finished."
        }
    }
}
