<template>
  <div class="wrapper">
    <!-- Fixed Top Bar -->
    <header class="top-bar">
      <nav class="nav flex-between">
        <div class="logo">QikTest</div>
        <ul class="nav-links flex-center">
          <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          <li><NuxtLink to="/about">Whats up ?</NuxtLink></li>
          <li><NuxtLink to="/pricing">Pricing</NuxtLink></li>
          <li><NuxtLink class="btn btn-primary" to="/login">Sign In</NuxtLink></li>
          <li><NuxtLink class="btn btn-secondary" to="/register">Sign Up</NuxtLink></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-text">
          <h1>Optimize your productivity with automated tests</h1>
          <p>Save time and increase efficiency with QikTest, the automated testing tool built for developers.</p>
        </div>
      </section>

      <!-- About Section -->
      <section class="about">
        <h2>What is QikTest?</h2>
        <p>QikTest is an advanced tool that automatically generates unit tests for your GitHub repositories. Focus on your code, let us handle the testing.</p>
      </section>

      <!-- Features Section -->
      <section class="features">
        <h2>Why Choose QikTest?</h2>
        <div class="feature-cards">
          <div class="feature-card">
            <h3>AI-powered Test Generation</h3>
            <p>Leverage the power of AI to generate meaningful and efficient unit tests for your projects.</p>
          </div>
          <div class="feature-card">
            <h3>Fast and Scalable</h3>
            <p>Our tool scales with your project, providing fast feedback no matter the size of your repository.</p>
          </div>
          <div class="feature-card">
            <h3>Seamless GitHub Integration</h3>
            <p>Integrates directly with your GitHub repositories to automate test generation effortlessly.</p>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section class="pricing">
        <h2>Choose Your Plan</h2>
        <p>We offer both free and premium plans to fit your needs. Start with a free trial and upgrade as you grow.</p>
        <div class="pricing-cards">
          <div class="pricing-card">
            <h3>Free Plan</h3>
            <p>Get started with basic test generation and limited GitHub repository integrations.</p>
            <NuxtLink to="/register" class="btn btn-primary">Start Free Trial</NuxtLink>
          </div>
          <div class="pricing-card">
            <h3>Premium Plan</h3>
            <p>Unlock advanced features, unlimited integrations, and AI-powered optimizations for larger projects.</p>
            <NuxtLink to="/register" class="btn btn-primary">Upgrade Now</NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer Section -->
    <footer>
      <p>&copy; 2025 QikTest. All Rights Reserved.</p>
    </footer>
  </div>
</template>
