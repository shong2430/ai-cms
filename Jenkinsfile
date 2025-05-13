pipeline {
  agent any

  tools {
    nodejs 'Node 18' 
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/shong2430/ai-cms.git'
      }
    }

    stage('Install') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Lint') {
      steps {
        sh 'yarn lint'
      }
    }

    stage('Build') {
      steps {
        sh 'yarn build'
      }
    }
  }
}
